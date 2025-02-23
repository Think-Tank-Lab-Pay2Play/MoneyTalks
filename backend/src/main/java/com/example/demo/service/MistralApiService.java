package com.example.demo.service;

import com.example.demo.config.ApiConfig;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@Service
public class MistralApiService {

    private final ApiConfig apiConfig;

    public MistralApiService(ApiConfig apiConfig) {
        this.apiConfig = apiConfig;
    }

    public JSONObject extractProductsFromImageUrl(String url,Long userId) throws IOException {
        String imagePath = null;
        try {
            //imi descarc imaginea de la url-ul din controller temporal
            imagePath = downloadImage(url);

            //creez un obiect json cu pathul de la imagine
            JSONObject jsonInput = new JSONObject();
            jsonInput.put("image_path", imagePath);

            //apelez metoda makeHttpRequest pentru a face un request catre api ul din flask trimitandu i pathul de la imagine
            String response = makeHttpRequest("/extract_products", jsonInput);

            //parsez raspunsul primit de la api ul din flask
            JSONObject finalResponse = parseResponse(response,userId);
            return finalResponse;
        } finally {
            if (imagePath != null) {
                new File(imagePath).delete();
            }
        }
    }

    //descarc imaginea temporal pentru a extrage produsele dand inapoi path-ul unde se descarca
    private String downloadImage(String imageUrl) throws IOException {
        //creez un obiect de tip url cu url-ul de la imagine
        URL url = new URL(imageUrl);

        //creeze numele imaginii pe care o voi descarca cu temp_ pentru a sti ca este temporala + milisecundele pentru a fi unica+
        // + incerca sa iau numele fisierului origninal luand textul de dupa ultimul / din url
        String fileName = "temp_" + System.currentTimeMillis() + "_" +
                imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

        // aici e clar ca pun in folderul temporar fisierul descarcat
        String tempDir = System.getProperty("java.io.tmpdir");

        //aici creez pathul
        String filePath = tempDir + File.separator + fileName;

        //aici descarc imaginea
        //deschid un stream de input pentru a citi imaginea si un stream de output pentru a scrie imaginea in fisierul respectiv
        try (InputStream in = url.openStream();
             FileOutputStream out = new FileOutputStream(filePath)) {

            //aici folosesc un buffer de maxim 4096 de bytes pentru a descarca imaginea
            byte[] buffer = new byte[4096];
            int bytesRead;

            //cat timp citesc din input stream si nu am ajuns la finalul fisierului scriu in output stream
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
            return filePath;
        }
    }

    private String makeHttpRequest(String endpoint, JSONObject jsonInput) throws IOException {
        HttpURLConnection conn = null;
        try {

            //configurarea conexiunii
            URL url = new URL(apiConfig.getBaseUrl() + endpoint);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; charset=utf-8");
            conn.setDoOutput(true);
            conn.setConnectTimeout(apiConfig.getConnectTimeout());
            conn.setReadTimeout(apiConfig.getReadTimeout());

            //deschid un stream de output pentru a trimite jsonul
            //folosesc un OutputStreamWriter pentru a scrie in streamul de output
            //trimit jsonul
            //flush pentru a trimite datele
            try (OutputStream os = conn.getOutputStream();
                 OutputStreamWriter osw = new OutputStreamWriter(os, "UTF-8")) {
                osw.write(jsonInput.toString());
                osw.flush();
            }

            int responseCode = conn.getResponseCode();

            InputStream inputStream = (responseCode >= 200 && responseCode < 300) ?
                    conn.getInputStream() : conn.getErrorStream();

            try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }

                String responseStr = response.toString();
                return responseStr;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
    }

    private JSONObject parseResponse(String response,Long userId) {
        try {
            JSONObject jsonResponse = new JSONObject(response);

            String rawData = jsonResponse.getString("response")
                    .replace("```json\n", "")
                    .replace("\n```", "")
                    .trim();

            JSONArray dataArray = new JSONArray(rawData);
            JSONObject productData = dataArray.getJSONObject(0);

            JSONObject finalResponse = new JSONObject();
            finalResponse.put("userId", userId);
            finalResponse.put("companyName", productData.getString("companyName"));
            finalResponse.put("totalPrice", productData.getDouble("totalPrice"));
            finalResponse.put("date", productData.getString("date"));
            finalResponse.put("products", productData.getJSONArray("products"));
            finalResponse.put("description", productData.getString("description"));

            return finalResponse;
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse JSON response: " + e.getMessage(), e);
        }
    }
}

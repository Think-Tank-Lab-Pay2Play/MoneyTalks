package com.example.demo.service;

import com.example.demo.config.ApiConfig;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
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
        // Decodifică URL-ul pentru a evita problemele cu caractere speciale (ex: %2F -> /) specific pt firebase
        String decodedUrl = URLDecoder.decode(imageUrl, "UTF-8");

        // Extragem numele fișierului original din URL, fără parametrii de query (după ?)
        String fileName = "temp_" + System.currentTimeMillis() + "_" +
                decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1).split("\\?")[0];

        // Directorul temporar unde se va salva imaginea
        String tempDir = System.getProperty("java.io.tmpdir");
        String filePath = tempDir + File.separator + fileName;

        // Deschidem stream-ul pentru a citi imaginea și a o salva în fișierul temporar
        try (InputStream in = new URL(imageUrl).openStream();
             FileOutputStream out = new FileOutputStream(filePath)) {

            byte[] buffer = new byte[8192]; // Buffer de 8KB pentru viteză
            int bytesRead;

            // Citim și scriem datele în fișier
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }

            return filePath;
        } catch (IOException e) {
            throw e;
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
            JSONObject productData = new JSONObject(response);

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

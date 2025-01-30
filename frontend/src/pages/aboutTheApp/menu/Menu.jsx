import TabButton from "./TabButton.jsx";
import { useState } from 'react';
import { EXAMPLES } from "./data.js";
import Section from "./Section.jsx";
import Tabs from "./Tabs.jsx";
import "./Menu.css"

export default function Menu() {
    const [selectedTopic, setSelectedTopic] = useState();

    function handleSelect(selectedButton) {
        setSelectedTopic(selectedButton);
    }

    return (
        <div id="examples" className="custom-position">
            <Section title="Pe această pagină puteți afla informații interesante despre aplicație." id="examples">
                <Tabs buttons={
                    <>
                        <div style={{ position: "relative" }}>
                            <div className="background-for-buttons" />
                            <menu>
                                <TabButton isSelected={selectedTopic === "ceEsteAplicatia"} onClick={() => handleSelect("ceEsteAplicatia")}>Ce este această aplicație?</TabButton>
                                <TabButton isSelected={selectedTopic === "cumFunctioneaza"} onClick={() => handleSelect("cumFunctioneaza")}>Cum funcționează aplicația?</TabButton>
                                <TabButton isSelected={selectedTopic === "beneficiiAplicatie"} onClick={() => handleSelect("beneficiiAplicatie")}>Ce beneficii oferă aplicația?</TabButton>
                                <TabButton isSelected={selectedTopic === "alteInformatii"} onClick={() => handleSelect("alteInformatii")}>Alte informații</TabButton>
                            </menu>
                        </div>
                    </>
                }>
                    {selectedTopic !== undefined ? (
                        <div id="tab-content" key={selectedTopic}>
                            <h3>{EXAMPLES[selectedTopic].title}</h3>
                            <p>{EXAMPLES[selectedTopic].description}</p>
                            <pre>
                                <code>
                                    {EXAMPLES[selectedTopic].code}
                                </code>
                            </pre>
                        </div>
                    ) : (
                        <div className="placeholder-message">
                            ☆ Selectați unul dintre topicurile de mai sus și aflați mai multe informații despre aplicație! ☆
                        </div>
                    )}
                </Tabs>
            </Section>
        </div>
    );
}
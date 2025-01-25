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
        <Section title="Pe aceasta pagina puteti afla functionalitatile aplicatiei" id="examples">
            <Tabs buttons={
                <>
                    <div style={{ position: "relative" }}>
                        <div className="background-for-buttons" />
                        <menu>
                            <TabButton isSelected={selectedTopic === "ceEsteAplicatia"} onClick={() => handleSelect("ceEsteAplicatia")}>Ce este aceasta aplicatie?</TabButton>
                            <TabButton isSelected={selectedTopic === "jsx"} onClick={() => handleSelect("jsx")}>Cum ma poate ajuta?</TabButton>
                            <TabButton isSelected={selectedTopic === "props"} onClick={() => handleSelect("props")}>Props</TabButton>
                            <TabButton isSelected={selectedTopic === "state"} onClick={() => handleSelect("state")}>State</TabButton>
                        </menu>
                    </div>
                </>
            }>

                {selectedTopic !== undefined ? (<div id="tab-content">
                    <h3>{EXAMPLES[selectedTopic].title}</h3>
                    <p>{EXAMPLES[selectedTopic].description}</p>
                    <pre>
                        <code>
                            {EXAMPLES[selectedTopic].code}
                        </code>
                    </pre>
                </div>) : "Selectati unul dintre topicurile de mai sus!"}
            </Tabs>
        </Section>
    );
}

export const learningPlanParse = (text) => {

    // Object to hold the parsed structure
    const parsedStructure = {
      title: "",
      sections: []
    };
  
    // Regex to extract the title
    const titleRegex = /Title:\s*(.+?)\s*1/;
    const titleMatch = text.match(titleRegex);
    if (titleMatch) {
      parsedStructure.title = titleMatch[1].trim();
    }


    // Split the text into sections based on numbered items
    const sections = text.split(/\n(?=\d+)/);
  
    parsedStructure.sections = sections.map((section, idx) => {
        // Split the section into lines
        const lines = section.split("\n");
        // The first line is the broad topic
        const broadTopic = lines[0].trim();
        // The rest of the lines are the subtopics
        const subtopics = lines.slice(1).map((subtopic) => {
            return subtopic.trim().replace(/- /, "")
        }).filter((subtopic) => {
            return subtopic !== "";
        });
        return { broadTopic, subtopics };
    }).filter((section,idx) => idx !== 0)

    console.log(parsedStructure);
    return parsedStructure;
}
  


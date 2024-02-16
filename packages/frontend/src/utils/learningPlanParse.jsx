export const learningPlanParse = (text) => {

    // Object to hold the parsed structure
    const parsedStructure = {
      title: "",
      sections: []
    };
  
    // Regex to extract the title
    const titleRegex = /# Topic:\s*(.+?)\s*\n/;
    const titleMatch = text.match(titleRegex);
    if (titleMatch) {
      parsedStructure.title = titleMatch[1].trim();
    }



    // Extract Table of Contents list
    const contentsRegex = /Table of Contents:\s*(.+?)\s*##/s;
    const contentsMatch = text.match(contentsRegex);
    const filteredTOC = contentsMatch[0].split("\n").filter((item) => {
        return item[0] === "-"
    }).map((item) => {
        const match = item.match(/\[([^\]]+)\]/); // Match the text inside square brackets
        return match ? match[1] : item; // Return the matched text, or the original item if no match was found
    }).slice(1, -1); // Remove the first and last items
    
    parsedStructure.sections = filteredTOC

    console.log(parsedStructure);
    return parsedStructure;
}
  


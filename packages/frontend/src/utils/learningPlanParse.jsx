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
    const contentsRegex = /- \[(.*?)\]\(.*?\)/g;
    let contentsMatch;

    while ((contentsMatch = contentsRegex.exec(text)) !== null) {
      parsedStructure.sections.push({
        title: contentsMatch[1],
        content: {},
        completed: false,
        score: 0
        });
    }

    console.log(parsedStructure);
    return parsedStructure;
}
  


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
        score: 0,
        pages: {},
        started: false
        });
    }

    console.log(parsedStructure);
    return parsedStructure;
}

export const learningPlanIsolateSection = (lesson, text) => {
    const section = lesson.split('##').filter((section) => section.includes(text) && !section.includes('Table of Contents'))[0].split('\n').slice(1).join('\n');
    console.log("SECTIONNNN ", section);
    return section
}    


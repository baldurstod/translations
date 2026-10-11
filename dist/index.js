import fs from 'fs';
import path from 'path';

var english = {lang:"english",strings:{"#viewport":"Viewport","#primary_viewport":"Primary viewport","#secondary_viewport":"Secondary viewport","#timeline":"Timeline","#script_editor":"Script editor","#shader_editor":"Shader editor","#viewports":"Viewports","#scene_explorer":"Scene explorer","#outline":"Outline","#options":"Options","#advanced_options":"Advanced options","#language":"Language","#model_selector":"Model selector","#character_selector":"Character selector","#element_viewer":"Element viewer","#status_bar_clip":"Clip: ${name}, start: ${start}, duration: ${duration}","":""}};

var french = {lang:"french",strings:{"#viewport":"Affichage","#primary_viewport":"Affichage primaire","#secondary_viewport":"Affichage secondaire","#timeline":"Chronologie","#script_editor":"Éditeur de scripts","#shader_editor":"Éditeur de shaders","#viewports":"Affichages","#scene_explorer":"Explorateur de scène","#outline":"Schéma","#options":"Options","#advanced_options":"Options avancées","#language":"Langue :","#model_selector":"Sélecteur de modèle","#character_selector":"Sélecteur de personnage","#element_viewer":"Visualiseur d'éléments","#status_bar_clip":"Extrait: ${name}, début: ${start}, durée: ${duration}","":""}};

const translations = {
    english,
    french,
};
/**
 * Build the translations files for your project.
 * @param inputFile The path of a json file containing an array of strings to include in the output files.
 * @param outputDir The path of an output directory where the translations will be written.
 * @param suppressWarning Remove the 'translation not found' warning. Default to false.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 */
async function buildTranslations(inputFile, outputDir, suppressWarning = false, space) {
    try {
        const fileContent = await fs.promises.readFile(inputFile, { encoding: 'utf8' });
        const translationsJSON = JSON.parse(fileContent);
        for (const lang of translationsJSON.langs) {
            const translation = translations[lang];
            if (!translation) {
                console.warn(`Translation not found for lang ${lang}`);
                continue;
            }
            const strings = {};
            const language = {
                lang,
                strings,
            };
            for (const translationString of translationsJSON.strings) {
                if (translationString === '') {
                    continue;
                }
                const tr = translation.strings[translationString];
                if (tr) {
                    strings[translationString] = tr;
                }
                else {
                    if (!suppressWarning) {
                        console.warn(`Translation not found for lang ${lang}, string ${translationString}`);
                    }
                }
            }
            await fs.promises.writeFile(path.join(outputDir, lang + '.json'), JSON.stringify(language, undefined, space));
        }
    }
    catch (e) {
        console.error('Failed to build translations', e);
    }
}

export { buildTranslations, translations };

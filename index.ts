
import fs from 'fs';
import path from 'path';
import english from './translations/english.json';
import french from './translations/french.json';

type I18nTranslation = {
	lang: string,
	authors?: string[],
	strings: Record<string, string>,
};

type I18nTranslationRequest = {
	/** The languages to generate */
	langs: string[],
	/** The strings to include */
	strings: string[],
};

export const translations: Record<string, I18nTranslation> = {
	english,
	french,
}

/**
 * Build the translations files for your project.
 * @param inputFile The path of a json file containing an array of strings to include in the output files.
 * @param outputDir The path of an output directory where the translations will be written.
 * @param suppressWarning Remove the 'translation not found' warning. Default to false.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 */
export async function buildTranslations(inputFile: string, outputDir: string, suppressWarning = false, space?: string | number): Promise<void> {
	try {
		const fileContent = await fs.promises.readFile(inputFile, { encoding: 'utf8' });
		const translationsJSON = JSON.parse(fileContent) as I18nTranslationRequest;

		for (const lang of translationsJSON.langs) {
			const translation = translations[lang];
			if (!translation) {
				console.warn(`Translation not found for lang ${lang}`);
				continue;
			}

			const strings: Record<string, string> = {};
			const language: I18nTranslation = {
				lang,
				strings,
			}
			for (const translationString of translationsJSON.strings) {
				if (translationString === '') {
					strings[''] = '';
					continue;
				}
				const tr = translation.strings[translationString];
				if (tr) {
					strings[translationString] = tr;
				} else {
					if (!suppressWarning) {
						console.warn(`Translation not found for lang ${lang}, string ${translationString}`);
					}
				}
			}

			await fs.promises.writeFile(path.join(outputDir, lang + '.json'), JSON.stringify(language, undefined, space));
		}
	} catch (e) {
		console.error('Failed to build translations', e);
	}
}

// import {filmInfo} from "./filmInfo";
import {getFilmName} from "./getFilmName";
import {Session} from "neo4j-driver";
import {FilmFacts} from "./FilmFacts";

const {getSession} = require("./getSession");

function prettyOutput(title: string, filmFacts: FilmFacts) {
    return `Here's info about the film '${title}':
    tagline: ${filmFacts.tagline}.
    year released: ${filmFacts.year}.`;
}

export async function interactiveGetFilmInfo() {
    const session: Session = getSession()
    const title = await getFilmName()

    const {filmInfo} = require("./filmInfo") ;
    const filmFacts: FilmFacts = await filmInfo(title, session);

    if (filmFacts.year === 0 && filmFacts.tagline === '') {
        // eslint-disable-next-line no-console
        console.log(`No info is stored about the film '${title}'.`)
        return
    }
    // eslint-disable-next-line no-console
    console.log(prettyOutput(title, filmFacts))
}

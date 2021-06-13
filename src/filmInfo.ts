import {Session} from "neo4j-driver";
import {filmQuery} from "./filmQuery";
import {FilmFacts} from "../FilmFacts";

export async function filmInfo(title: string, session: Session):
    Promise<FilmFacts> {
    let returnValue: any = {tagline:'', year: 0}
    try {
        const result = await session.run(
            filmQuery,
            {
                title,
            })

        const movieProperties =
            result.records[0].get('m').properties

        returnValue = {
            tagline: movieProperties.tagline,
            year: movieProperties.released.low
        }

    } catch (error) {
        if (error.name==='TypeError') {
            return returnValue
        }
        throw new Error(`error getting film info: ${error}`)
    }

    return returnValue
}

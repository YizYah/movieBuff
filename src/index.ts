import {interactiveGetFilmInfo} from "./interactiveGetFilmInfo";

(async () => {
    // this wrapper just exists to exit from the process
    try {
        await interactiveGetFilmInfo()
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        process.exit(1)
    }
    process.exit(0)
})()

import {MockOutput} from "neo-forgery";

export const expectedOutput: MockOutput = {
    records: [
        {
            "keys": [
                "m"
            ],
            "length": 1,
            "_fields": [
                {
                    "identity": {
                        "low": 141,
                        "high": 0
                    },
                    "labels": [
                        "Movie"
                    ],
                    "properties": {
                        "louvain": {
                            "low": 142,
                            "high": 0
                        },
                        "degree": 5,
                        "tagline": "He didn't want law. He wanted justice.",
                        "title": "Hoffa",
                        "released": {
                            "low": 1992,
                            "high": 0
                        }
                    }
                }
            ],
            "_fieldLookup": {
                "m": 0
            }
        }
    ]
}

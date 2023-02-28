export const RIKOKSET_PAIJAT_HAMEESSA_2021 = `
  {
    "query": [
      {
        "code": "Vuosi",
        "selection": {
          "filter": "item",
          "values": [
            "2021"
          ]
        }
      },
      {
        "code": "Kunta",
        "selection": {
          "filter": "item",
          "values": [
            "KU016",
            "KU081",
            "KU111",
            "KU098",
            "KU316",
            "KU398",
            "KU560",
            "KU576",
            "KU781"
          ]
        }
      },
      {
        "code": "Rikosryhmä ja teonkuvauksen tarkenne",
        "selection": {
          "filter": "item",
          "values": [
            "101T603"
          ]
        }
      },
      {
        "code": "Tiedot",
        "selection": {
          "filter": "item",
          "values": [
            "rikokset_lkm"
          ]
        }
      }
    ],
    "response": {
      "format": "json-stat2"
    }
  }
`
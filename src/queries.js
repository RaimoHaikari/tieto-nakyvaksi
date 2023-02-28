export const VAESTO_LAHDESSA_2021 = `
  {
    "query": [
      {
        "code": "Kunta ja taajama",
        "selection": {
          "filter": "item",
          "values": [
            "KU398"
          ]
        }
      },
      {
        "code": "Sukupuoli",
        "selection": {
          "filter": "item",
          "values": [
            "1",
            "2"
          ]
        }
      },
      {
        "code": "Ikä",
        "selection": {
          "filter": "agg:10-vuotisikä 0-9, 10-19, , 90-.agg",
          "values": [
            "0-9",
            "10-19",
            "20-29",
            "30-39",
            "40-49",
            "50-59",
            "60-69",
            "70-79",
            "80-89",
            "90-"
          ]
        }
      }
    ],
    "response": {
      "format": "json-stat2"
    }
  }
`;


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
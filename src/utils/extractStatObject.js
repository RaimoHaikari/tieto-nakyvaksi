/*
 * Suodatetaan Tilastokeskuksen PxWeb API rajapinna palauttamasta json -objektista
 *
 * - Tietoon tulleet rikokset ja niiden selvittäminen rikosryhmittäin tekokunnan ja ilmoitusvuoden mukaan
 * 
 * vaakapylväskuviossa tulostettavat tiedot, eli kunnan nimi ja rikosten määrä.
 */
export const rikoksetPaijatHameessa = (data) => {
    
    const { label } = data.dimension.Kunta.category;

    return Object.values(label).map((K,i) => {

      return {
        kunta: K,
        rikoksia: data.value[i]
      }

    })

}

/*
 * Puretaan tiedot tilastokeskuksen palauttamasta json-objektista: 
 * - 11re -- Väestö iän (1-v.) ja sukupuolen mukaan alueittain, 1972-2021
 * 
 * Väestöpyramisssa on ikäluokittain ryhmään kuuluvien naisten ja miesten määrä.
 * 
 * Objektissa tiedot ovat peräkkäin yksiulotteisessa taulukossa siten, että
 * kaksi perättäistä arvoa kertoo aina tiettyyn ikäryhmään kuuluvien jäsenten
 * miesten ja naisten määrän. Liikkeelle lähdetään nuorimmasta ryhmästä ja 
 * näin käydään läpi kaikki ikäluokat.
 * 
 * Tiedot on tallennettu objektiin: data.value
 * - objekti sisältää taulukon, jossa on dimensioiden Ikä ja Sukupuoli mukaisesti
 *   edeten on listattu ikä- ja sukupuoliryhmään kuuluvien jäsenten määrä
 */
export const vaestorakenneKunnassa = (data) => {

  // - aineiston sisältämät ikäluokat
  const age = data.dimension.Ikä.category.label;
  // - listaus etenee aina tässä järjestyksessä per ikäluokka
  const gender = Object.values(data.dimension.Sukupuoli.category.label);

  const values = []

  Object.values(age).forEach((a,i) => {
    const index = 2 * i;

    values.push({
      age: a,
      gender: gender[0],
      value: data.value[index]
    })

    values.push({
      age: a,
      gender: gender[1],
      value: data.value[index +1]
    })
    
  })

  return values;

}

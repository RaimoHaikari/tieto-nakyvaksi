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

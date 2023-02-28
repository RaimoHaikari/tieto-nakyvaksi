/*
 * Tiedon haku Tilastokeskuksen API rajapinnasta
 *
 * Perustuu Dave Gray:n oppaaseen:
 * React Custom Hooks with Axios Async useEffect | React Tutorials for Beginners
 * https://www.youtube.com/watch?v=tBuceoEGFhI
 * 
 * Tehdään cuostomHook, jonka avulla tieto luetaan Tilastokeskuksen palvelimelta.
 *
 * customHookin sisällä käytetään React:in perus Hook:ja:
 * - tilan tallentamiseen
 * - toiminnan ohjaamiseen
 * 
 * Tätä varten heti alkuun tuodaan sekä useState että useEffect -hookit.
 * 
 * Lisäksi tiedon lukemisessa tilastokeskuksen palvelimelta käytetään apuna axios -kirjastoa,
 * joten tuodaan sekin tien
 */
import { useState, useEffect } from "react";
import axios from "axios";

/* 
 *
 */
export const useData = (url, query) => {

    /*
     * customHook seuraa kahden muuttujan tilaa:
     * 
     * 1. data
     * - muuttujaan tallennetaan tilastokeskuksesta luettava aineisto
     * 
     * 2. loading
     * - muuttuja sisältää tiedon siitä, ollaanko juuri nyt lukemassa tietoa 
     */
    const [pxData, setPxData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    /*
     * Kun useEffectin toisena parametrinä annetaan tyhjä taulukko, useEffect ajetaan ainoastaan
     */
    useEffect(() => {

        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (_url, _query) => {

            setLoading(true);

            try {

                const response = await axios.post(
                    _url,
                    _query,
                    {
                        cancelToken: source.token
                    }
                );

                if(isMounted){
                    setPxData(response.data);
                    setFetchError(null);
                }

            } catch (err) {

                if(isMounted){

                    setPxData([]);
                    setFetchError(err.message);

                }

            } finally {
                isMounted && setLoading(false);
            }

        }

        fetchData(url, query);

        const cleanUp = () => {

            isMounted = false;
            source.cancel();

        }

        return cleanUp;


    }, [url, query]); 

    /*
     * Lopuksi määritetään customHookin palauttamat arvot, eli
     * - luettu tieto
     * - tieto siitä, ollaanko lukemassa tietoa
     */
    return {
        pxData,
        fetchError,
        loading
    };

};
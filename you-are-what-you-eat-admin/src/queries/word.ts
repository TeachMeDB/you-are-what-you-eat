

import { Word } from "@/models/word";
import axios from "axios"

class WordApi {
    public getWord = async () => {

        var config = {
            method: 'get',
            url: 'https://v1.hitokoto.cn?c=k&min_length=50&max_length=120',
            headers: {
                'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)'
            }
        };
        try{
            let response= (await axios(config))

            return response.data as Word;

        }
        catch(e){
            return null;
        }
    }
}

export const wordApi = new WordApi();
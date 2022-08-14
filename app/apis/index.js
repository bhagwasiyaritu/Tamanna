import baseUrl from "./baseUrl";

const appId = 'b42fa05e7f71a35642a45ac588e1f720'

export const getCurrentWeather = async (lat, lon) => {
    return await baseUrl.get("",{
        params:{
            lat:lat,
            lon:lon,
            appid:appId
        }
    });
};
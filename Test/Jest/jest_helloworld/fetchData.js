import axios from "axios";

export const fetchData = (handleResponse) => {
    axios.get("http://localhost:12347/test_api").then((response) => {
        handleResponse(response.data);
    });
};

export const fetchData2 = () => {
    return axios.get("http://localhost:12347/test_api");
};

export const fetchData3 = () => {
    return axios.get("http://localhost:12347/test_api_error");
};

export const fetchData4 = () => {
    return axios.get("http://localhost:12347/test_api");
};

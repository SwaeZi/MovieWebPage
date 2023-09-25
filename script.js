const fetchData = async () => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '535e335d',
            s: 'avengers'
        }
    });
    console.log(response.data);
};
fetchData();
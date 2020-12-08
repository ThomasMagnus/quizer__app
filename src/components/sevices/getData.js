const getData = async (URL) => {
    const res = await fetch(URL)

    if (!res.ok) {
        new Error(res.status)
    }

    return await res.json()
}

export default getData

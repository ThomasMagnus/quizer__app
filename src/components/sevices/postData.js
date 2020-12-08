export const postData = async (URL, bodyFile) => {
    const res = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(bodyFile)
    })

    if (!res.ok) {
        new Error(res.status)
    }

}

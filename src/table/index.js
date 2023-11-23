import { useState } from "react"


export default function Table({ data }) {

    const [page, setpage] = useState(1)
    function getdataObject(data) {
        let keys = []
        Object.keys(data).forEach(key => {
            if (!keys.includes(key)) {
                keys.push(key);
            }
        });
        let item = ''
        keys.forEach((items) => {
            item += `${items}:${data[items]}\n`
        })
        return item
    }
    function getAllUniqueKeys(data) {
        const allKeys = data.reduce((keys, item) => {
            Object.keys(item).forEach(key => {
                if (!keys.includes(key)) {
                    keys.push(key);
                }
            });
            return keys;
        }, []);
        return allKeys;
    }
    const allKeys = getAllUniqueKeys(data)
    
    return (
        <div style={{ marginTop: '30px' }}>
            {/* <button onClick={() => setpage(page + 1)}>Load more...</button> */}
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        {allKeys.map(header => <th key={header}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {allKeys.map(header => (
                                <td key={`${index}-${header}`}>{item[header] ? (typeof item[header] == 'object' ? getdataObject(item[header]) : item[header]) : 'N/A'}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}



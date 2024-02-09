import { faMemory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { FaMemory } from 'react-icons/fa';

const REST_API_SERVER_URL = process.env.REACT_APP_REST_API_SERVER_URL || "https://api.kaspa.org/"


const KaspadInfoBox = () => {
    const [data, setData] = useState({});

    async function updateData() {
        // await fetch('https://api.kaspa.org/info/kaspad')
        await fetch(`${REST_API_SERVER_URL}/info/kaspad`)
            .then((response) => response.json())
            .then(d => setData(d))
            .catch(err => console.log("Error", err))
        setTimeout(updateData, 60000)
    }
    useEffect(() => {

        updateData()
    }, [])


    return <>
        <div className="cardBox mx-0">
            <table>
                <tr>
                    <td colspan='2' className="text-center" style={{ "fontSize": "4rem" }}>
                        <FontAwesomeIcon icon={faMemory} />
                        <div />
                    </td>
                </tr>
                <tr>
                    <td colspan="2" className="text-center">
                        <h3>RASPA INFO</h3>
                    </td>
                </tr>
                <tr>
                    <td className="cardBoxElement">
                        Mempool size
                    </td>
                    <td className="text-end">
                        {data.mempoolSize}
                    </td>
                </tr>
                <tr>
                    <td className="cardBoxElement">
                        Server version
                    </td>
                    <td className="text-end">
                        {data.serverVersion}
                    </td>
                </tr>
            </table>
        </div>
    </>
}


export default KaspadInfoBox
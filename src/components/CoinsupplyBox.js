import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useContext, useEffect, useState } from "react";
import { numberWithCommas } from "../helper";
import { getCoinSupply, getHalving } from '../kaspa-api-client';
import PriceContext from "./PriceContext";

const REST_API_SERVER_URL = process.env.REACT_APP_REST_API_SERVER_URL || "https://api.kaspa.org/"
const COIN_NAME = process.env.REACT_APP_COIN_NAME || "KAS"

const CBox = () => {
    const [circCoins, setCircCoins] = useState("-");
    const [blockReward, setBlockReward] = useState("-");
    const [halvingDate, setHalvingDate] = useState("-");
    const [halvingAmount, setHalvingAmount] = useState("-");

    const initBox = async () => {
        const coinSupplyResp = await getCoinSupply()
        getBlockReward();

        getHalving().then((d) => {
            setHalvingDate(moment(d.nextHalvingTimestamp * 1000).format("YYYY-MM-DD HH:mm"))
            setHalvingAmount(d.nextHalvingAmount.toFixed(2))
        })

        setCircCoins(Math.round(coinSupplyResp.circulatingSupply / 100000000))
    }

    useEffect(() => {
        initBox();

        const updateCircCoins = setInterval(async () => {

            const coinSupplyResp = await getCoinSupply()
            setCircCoins(Math.round(coinSupplyResp.circulatingSupply / 100000000))

        }, 10000)


        return async () => {
            clearInterval(updateCircCoins)
        };
    }, [])

    async function getBlockReward() {
        // await fetch('https://api.kaspa.org/info/blockreward')
        await fetch(`${REST_API_SERVER_URL}/info/blockreward`)
            .then((response) => response.json())
            .then(d => {
                setBlockReward(d.blockreward.toFixed(2))

            })
            .catch(err => console.log("Error", err))
    }


    useEffect(() => {
        document.getElementById('coins').animate([
            // keyframes
            { opacity: '1' },
            { opacity: '0.6' },
            { opacity: '1' },
        ], {
            // timing options
            duration: 300
        });
    }, [circCoins])


    return <>
        <div className="cardBox mx-0">
            <table style={{ fontSize: "1rem" }}>
                <tr>
                    <td colspan='2' className="text-center" style={{ "fontSize": "4rem" }}>
                        <FontAwesomeIcon icon={faCoins} />
                        <div id="light1"  />
                    </td>
                </tr>
                <tr>
                    <td colspan="2" className="text-center">
                        <h3>Coin supply</h3>
                    </td>
                </tr>
                <tr>
                    <td className="cardBoxElement align-top">
                        Total</td>
                    <td className="text-end">
                        <div id="coins">{numberWithCommas(circCoins)} KAS
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="cardBoxElement align-top">Max <span className="approx">(approx.)</span></td>
                    <td className="pt-1 text-end">28,700,000,000 KAS</td>
                </tr>
                <tr>
                    <td className="cardBoxElement align-top">Mined</td>
                    <td className="pt-1 text-end">{(circCoins / 28700000000 * 100).toFixed(2)} %</td>
                </tr>
                <tr>
                    <td className="cardBoxElement align-top">Block reward</td>
                    {/* <td className="pt-1">{blockReward} KAS</td> */}
                    <td className="pt-1">{blockReward} {COIN_NAME}</td>
                </tr>
                <tr>
                    <td className="cardBoxElement align-top">Reward reduction
                        {/* <OverlayTrigger overlay={<Tooltip id="halvinginfo">Here is some information about the chromatic halving..</Tooltip>}>
                            <span>
                            <FaInfoCircle />
                            </span>
                        </OverlayTrigger> */}
                    </td>
                    {/* <td className="pt-1">{halvingDate}<br /><div className="text-end w-100 pe-3 pt-1" style={{ fontSize: "small" }}>to {halvingAmount} KAS</div></td> */}
                    <td className="pt-1">{halvingDate}<br /><div className="text-end w-100 pe-3 pt-1" style={{ fontSize: "small" }}>to {halvingAmount} {COIN_NAME}</div></td>
                </tr>
            </table>
        </div>
    </>
}


export default CBox

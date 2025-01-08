import React, { useState } from 'react'
import { GoArrowSwitch } from "react-icons/go";

const ExchangeForm = () => {

    const currencyCodes = [
        "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
        "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
        "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
        "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
        "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
        "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
        "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
        "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
        "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
        "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
        "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
        "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
        "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD",
        "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY",
        "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES",
        "VND", "VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW",
        "ZWL"
    ];

    const [amount, setAmount] = useState (100)
    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('AED')
    const [result, setResult] = useState ()

    const getExchangeRate = async () => {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`

        try {
            const response = await fetch(API_URL)
            if(!response.ok) throw Error('someting is wrong')

            const data = await response.json()

            const conv_rate = (data.conversion_rate * amount).toFixed(2)
            const result = (`${amount} ${fromCurrency} = ${conv_rate} ${toCurrency}`)
            setResult(result)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getExchangeRate()
    }

    const handleChange = (e) => {
        setAmount(e.target.value)
    }

    const countrycode = fromCurrency.substring(0, 2)
    const countrycodes = toCurrency.substring(0, 2)

    getExchangeRate()

  return (
    <div className='bg-bg bg-cover bg-center h-screen w-full overflow-x-hidden'>
        <div>
        <form onSubmit={handleSubmit} className='container w-[320px] flex-col mx-auto relative top-28 outline outline-2 outline-gray-700 p-[32px] pb-4 pt-4 rounded backdrop-blur-[30px] shadow-main h-[510px] sm:w-[400px]'>
        <p className='flex pt-[180px] justify-center font-semibold text-white text-2xl relative bottom-40 '>Currency Converter</p>
            <label className='text-white text-[16px] relative bottom-32'>Enter Amount</label>
            <input className='bg-gray-400/20 h-[36px] relative bottom-[118px] rounded outline outline-1 outline-gray-600 text-white pl-4 w-[254px] sm:w-[334px]' type='number' value={amount} required onChange={handleChange}></input>
            <div className='flex-row relative'>
            <div className='justify-center relative top-4'>
            <h1 className='text-white relative bottom-[86px]'>From</h1>
            <select className='bg-gray-400/20 text-white text-[16px] p-2 pl-8 pr-4 rounded outline outline-1 outline-gray-600 relative bottom-20' onChange={(e) => setFromCurrency(e.target.value)} value={fromCurrency}>
                {currencyCodes.map((e) => (
                    <option key={e} className='bg-gray-700/100'>{e}</option>
                ))}
            </select>
            <img src={`https://flagsapi.com/${countrycode}/flat/64.png`} className='w-[26px] h-[26px] relative bottom-[114px] left-1'></img>
            </div>
            <div className='justify-center relative flex-row left-[144px] bottom-[74px] sm:left-[224px]'>
            <h1 className='text-white relative bottom-[86px]'>To</h1>
            <select className='bg-gray-400/20 text-white text-[16px] p-2 pl-8 pr-4 rounded outline outline-1 outline-gray-600 relative bottom-20' onChange={(e) => setToCurrency(e.target.value)} value={toCurrency}>
                {currencyCodes.map((e) => (
                    <option key={e} className='bg-gray-700/100'>{e}</option>
                ))}
            </select>
            <img src={`https://flagsapi.com/${countrycodes}/flat/64.png`} className='w-[26px] h-[26px] relative bottom-[114px] left-1'></img>
            </div>
            </div>
            <GoArrowSwitch/>
            <button type='submit' className='bg-white text-gray-900 font-bold w-[254px] rounded h-12 relative bottom-36 sm:w-[334px]'>Get Exchange Rate</button>
            <div className='grid justify-center items-center text-center'>
            <h1 className='w-[254px] bg-gray-400/20 relative bottom-28 h-16 rounded text-white pt-[18px] text-[20px] font-bold shadow-sm sm:w-[334px]'>{result}</h1>
            </div>
        </form>
        </div>
    </div>
  )
}

export default ExchangeForm
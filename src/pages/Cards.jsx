import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DetailCards from '../components/DetailCards'
import Carrousel from '../components/Carrousel'
import { CARDS_TYPES } from '../utils/TypeCards'

function Cards() {
    const [cards, setCards] = useState([])

    useEffect(() => {
        axios("http://localhost:8080/api/clients/1")
            .then(response => {
            setCards(response.data.cards)
            })
            .catch(error => console.log(error))
    }, []);
    // console.log(cards)


    const cardsQuantity = cards.length



    const [cardsRequest, setCardsRequest] = useState([])
    useEffect(() => {
        axios("http://localhost:8080/api/cards/")
            .then(response => {
                setCardsRequest(response.data)
            })
            .catch(error => console.log(error))
    }, []) 
    // console.log(cardsRequest)

// console.log(CARDS_TYPES)

// PARA ARMAR DINÁMICAMENTE LOS SELECTS DE LAS CARDS
// CON EL REDUCE ITERO EL ARRAY, DÁNDOLE VALOR INICIAL CON LOS SET TYPE Y COLOR. 
// EN CADA ITERACIÓN LE AGREGO LOS VALORES AL SET CORRESPONDIENTE CON EL MÉTODO ADD.
// DESPUÉS CONVIERTO LOS SETS A ARRAYS. 
    // const listCards = cardsRequest.reduce((acc, card) => {
    //     acc.type.add(card.type)
    //     acc.color.add(card.color)
    //     return acc
    // }, { type: new Set(), color: new Set() })
    
    // const cardsType = {
    //     type: Array.from(listCards.type),
    //     color: Array.from(listCards.color)
    // }
    // console.log(cardsType)





// PARA ARMAR EL OBJETO
    const [cardSelected, setCardSelected] = useState({
        type: "",
        color: ""
    })





    function handleInput(e){
        return setCardSelected({
            ...cardSelected,
            [e.target.name]: e.target.value
        })
    }


    
    const [typeCardEntered, setTypeCardEntered] = useState(false)
    const [colorCardEntered, setColorCardEntered] = useState(false)
    //PARA BORRAR LAS ALERTAS CUANDO SE ELIGE UNA OPCIÓN
    function handleSelectChange(e) {
        if (e.target.name === "type") {
            setTypeCardEntered(false);
        }
        if (e.target.name === "color") {
            setColorCardEntered(false);
        }
    }




    function handleSubmit (e){
        e.preventDefault()

        if (cardSelected.type == ""){
            setTypeCardEntered(true)
            // console.log(typeCardEntered)
        } else {
            setTypeCardEntered(false)
        }
        if (cardSelected.color == ""){
            setColorCardEntered(true)
        } else {
            setColorCardEntered(false)
        }
    }
    // console.log(typeCardEntered);

    console.log(cardSelected)




// MÉTODO POST Y RESETEO DEL FORM
    // axios.post("http://localhost:8080/api/cards/", cardSelected)
    //     .then(response => {
    //         alert ("Card created successfully.")
    //     }).catch(error => console.log(error))
    //     setCardSelected({
    //         type: "",
    //         color: ""
    //     })



    return (
        <main className='w-full flex flex-col flex-1'> 
            <div className='w-full flex flex-wrap justify-center items-center px-14 gap-2 md:gap-20'>
                <h1 className='font-bold text-center text-3xl p-2 md:p-6'>Your Cards:</h1>
                <p className='font-semibold text-center text-gray-400'>Last entry: {new Date().toLocaleDateString('en-US', {style:'currency', currency:'USD'})}</p>
            </div>

            <Carrousel/>

            {cardsQuantity > 0 ?(<p className='font-bold text-center text-3xl pt-4'>You have {cardsQuantity} active cards:</p>) : (<p className='font-bold text-center text-3xl pt-4'>You don't have any active cards.</p>)}
            
            <div className='flex flex-wrap gap-6 justify-center md:gap-20'>
                {cards.map(card => <DetailCards key={card.id} type={card.type} color={card.color} number={card.number} cardholder={card.cardholder} thruDate={card.thruDate} cvv={card.cvv}/>)}
            </div>

            <div className='flex flex-wrap justify-center items-center pt-20'> 
                <div className='max-w-[600px] flex flex-wrap justify-center p-6'>
                    <img className='object-cover rounded-bl-[80px] rounded-tr-[80px]' src="/ApplyCard.png" alt="Image of man requesting credit" />
                </div>
                <div>
                    <form action="" className='flex flex-col justify-center items-center gap-5 p-6' onSubmit={handleSubmit}>
                        <fieldset>
                            <select name="type" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10" onChange={handleInput} onFocus={handleSelectChange}>
                            <option value="">Select type a card please...</option>
                            {CARDS_TYPES.type.map(type => (<option className="font-semibold italic" value={type} key={type}>{type}</option>))}
                            {/* {cardsType.type.map(type => (<option className="font-semibold italic" value={type} key={type}>{type}</option>))} */}
                            </select>

                            {typeCardEntered && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please select a card type.</p>}
                        </fieldset>
                        <fieldset>
                            <select name="color" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[350px] rounded-xl h-10" onChange={handleInput} onFocus={handleSelectChange}>
                            <option value="">Select card membership please...</option>
                            {CARDS_TYPES.color.map(color => (<option className="font-semibold italic" value={color} key={color}>{color}</option>))}
                            {/* {cardsType.color.map(color => (<option className="font-semibold italic" value={color} key={color}>{color}</option>))} */}
                            </select>
                            {colorCardEntered && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please select a card color.</p>}
                        </fieldset>
                        <input type="submit" value="Request" className='bg-red-600 rounded-xl py-2 px-1 hover:bg-red-700 w-[350px] text-center font-bold text-white'/>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Cards




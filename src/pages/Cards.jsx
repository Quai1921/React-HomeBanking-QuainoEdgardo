import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import DetailCards from '../components/DetailCards'
import Carrousel from '../components/Carrousel'
import { CARDS_TYPES } from '../utils/TypeCards'
// import { JWT_TOKEN } from '../utils/Token'
import { useSelector, useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions.js'


function Cards() {
    // const [cards, setCards] = useState([])

    // PARA ARMAR EL OBJETO
    const [cardSelected, setCardSelected] = useState({
        type: "",
        color: ""
    })


    const [typeCardEntered, setTypeCardEntered] = useState(false)
    const [colorCardEntered, setColorCardEntered] = useState(false)

    const [cardSuccess, setCardSuccess] = useState(false)
    const [cardExist, setCardExist] = useState(false)

    const [confirmCard, setConfirmCard] = useState(false)

    const dispatch = useDispatch()

    const { update } = authActions


    const user = useSelector(store => store.authReducer.user)
    // console.log(user)
    // const token = useSelector(store => store.authReducer.token)

    const formRef = useRef(null)

    const cardsQuantity = user.cards?.length



    // console.log(CARDS_TYPES)



    function handleInput(e) {
        return setCardSelected({
            ...cardSelected,
            [e.target.name]: e.target.value
        })
    }


    function handleSubmit(e) {
        e.preventDefault()

        setConfirmCard(false)

        let typeValid = true
        let colorValid = true

        const token = localStorage.getItem("token")

        if (cardSelected.type == "") {
            setTypeCardEntered(true)
            typeValid = false
        } else {
            setTypeCardEntered(false)

        }
        if (cardSelected.color == "") {
            setColorCardEntered(true)
            colorValid = false
        } else {
            setColorCardEntered(false)
        }
        if (user.cards?.some(card => card.type === cardSelected.type && card.color === cardSelected.color) && cardSelected.type !== "" && cardSelected.color !== "") {
            colorValid = false
            typeValid = false
            setCardExist(true)
        }

        if (typeValid && colorValid) {
            axios.post("/api/clients/current/cards", cardSelected, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then(response => {
                    // console.log(response.data)
                    if (response.data == "Card created") {
                        setCardSuccess(true)
                        setCardSelected({
                            type: "",
                            color: ""
                        })
                        formRef.current.reset()
                        // window.location.reload()
                    }
                })
                .catch(error => {
                    // console.log(error.response.data)
                    if (error.response.data == "You already have one card with type " + cardSelected.type + " and color " + cardSelected.color) {
                        setCardExist(true)
                    }
                })
        }
    }


    
    //PARA BORRAR LAS ALERTAS CUANDO SE ELIGE UNA OPCIÓN
    function handleSelectChange(e) {
        if (e.target.name === "type") {
            setTypeCardEntered(false)
            setCardSuccess(false)
            setCardExist(false)
        }
        if (e.target.name === "color") {
            setColorCardEntered(false)
            setCardSuccess(false)
            setCardExist(false)
        }
    }

    function handleConfirm(e) {
        e.preventDefault()

        let typeValid = true
        let colorValid = true


        if (cardSelected.type == "") {
            typeValid = false
            setTypeCardEntered(true)
            setConfirmCard(false)
        } 
        if (cardSelected.color == "") {
            colorValid = false
            setColorCardEntered(true)
        }
        if (user.cards?.some(card => card.type === cardSelected.type && card.color === cardSelected.color) && cardSelected.type !== "" && cardSelected.color !== "") {
            colorValid = false
            typeValid = false
            setCardExist(true)
        }
        
        if(typeValid && colorValid) {
            setConfirmCard(true)
        }
    }

    function handleCancel() {
        setConfirmCard(false)
    }

    function handleSuccess() {
        setCardSuccess(false)

        const token = localStorage.getItem("token")

        axios.get('/api/clients/current', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                // dispatch(current(response.data))
                dispatch(update({...user,
                    cards: response.data.cards}))
            })
            .catch(error => {
                // console.log(error.response.data)
            })
    }

    // useEffect(() => {
    //     console.log("User state updated:", user)
    // }, [user])


    // console.log(typeCardEntered)
    // console.log(cardSelected)
    // console.log(user.cards)


    return (
        <main className='w-full flex flex-col flex-1'> 

            <Carrousel/>

            <div className='w-full flex flex-wrap justify-center items-center px-14 gap-2 md:gap-20'>
                <p className='font-semibold text-center text-gray-400'>Last entry: {new Date().toLocaleDateString('en-US', {style:'currency', currency:'USD'})}</p>
            </div>

            {cardsQuantity > 0 ?(<h1 className='font-bold text-center text-3xl pt-4'>You have {cardsQuantity} active cards:</h1>) : (<h1 className='font-bold text-center text-3xl pt-4'>You don't have any active cards.</h1>)}
            
            <div className='flex flex-wrap gap-6 justify-center md:gap-20'>
                {user.cards?.map(card => <DetailCards key={card.id} id={card.id} type={card.type} color={card.color} number={card.number} cardholder={card.cardholder} thruDate={card.thruDate} cvv={card.cvv}/>)}
            </div>

            <div className='flex flex-wrap justify-center items-center pt-20'> 
                <div className='max-w-[600px] flex flex-wrap justify-center p-6'>
                    <img className='object-cover rounded-bl-[80px] rounded-tr-[80px]' src="/ApplyCard.png" alt="Image of man requesting credit" />
                </div>
                <div>
                    <form ref={formRef} className='flex flex-col justify-center items-center gap-5 p-1' onSubmit={handleConfirm}>
                        <fieldset>
                            <select name="type" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[330px] rounded-xl h-10" onChange={handleInput} onFocus={handleSelectChange}>
                            <option value="">Select type a card please...</option>
                            {CARDS_TYPES.type.map(type => (<option className="font-semibold italic" value={type} key={type}>{type}</option>))}
                            {/* {cardsType.type.map(type => (<option className="font-semibold italic" value={type} key={type}>{type}</option>))} */}
                            </select>
                            {typeCardEntered && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please select a card type.</p>}
                        </fieldset>

                        <fieldset>
                            <select name="color" className="font-semibold cursor-pointer border-2 border-[#d2ccff] w-[330px] rounded-xl h-10" onChange={handleInput} onFocus={handleSelectChange}>
                            <option value="">Select card membership please...</option>
                            {CARDS_TYPES.color.map(color => (<option className="font-semibold italic" value={color} key={color}>{color}</option>))}
                            {/* {cardsType.color.map(color => (<option className="font-semibold italic" value={color} key={color}>{color}</option>))} */}
                            </select>
                            {colorCardEntered && <p className='text-red-600 font-bold italic text-xs absolute pl-2'>Please select a card color.</p>}
                        </fieldset>

                        <div className='relative'>
                            <input type="submit" value="Request" className='bg-red-600 rounded-xl py-2 px-1 hover:bg-red-700 w-[330px] text-center font-bold text-white cursor-pointer' />
                            {cardExist && <p className='text-red-600 font-bold italic text-xs absolute pl-[27px] pt-2'>You already have a card with that color and type.</p>}
                            {/* {cardSuccess && <p className='text-green-600 font-bold italic absolute pl-[68px] pt-2 text-center'>Card created successfully.</p>} */}
                            {cardSuccess && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <p className='text-green-600 font-bold text-lg'>Card created successfully!</p>
                                    <p className="pt-4">Thank you for trusting MindHub Bank.</p>
                                    <div className="flex justify-center gap-4 mt-6">
                                        <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-md w-[120px]" onClick={handleSuccess}>Continue</button>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>

                    </form>
                </div>
            </div>

            {confirmCard && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className='font-semibold'>Do you confirm the operation?</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button className="bg-green-700 text-white font-semibold px-4 py-2 rounded-md w-[90px]" onClick={handleSubmit}>Confirm</button>
                            <button className="bg-gray-400 font-semibold px-4 py-2 rounded-md w-[90px]" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Cards

    {/* <h1 className='font-bold text-center text-3xl p-2 md:p-6'>Your Cards:</h1> */}


    //     axios("http://localhost:8080/api/clients/current", {
    //         method: "GET",
    //         headers: {
    //             "Authorization": "Bearer " + JWT_TOKEN
    //         }
    //     })
    //         .then(response => {
    //         setCards(response.data.cards)
    //         })
    //         .catch(error => console.log(error))
    // }, [])
    // console.log(cards)

    // const [cardsRequest, setCardsRequest] = useState([])
    // useEffect(() => {
    //     axios("http://localhost:8080/api/cards/" , {
    //         method: "GET",
    //         headers: {
    //             "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjp7ImF1dGhvcml0eSI6IlJPTEVfQ0xJRU5UIn0sInN1YiI6Im1lbGJhQG1pbmRodWIuY29tIiwiaWF0IjoxNzA5NTg2NjExLCJleHAiOjE3MDk1OTAyMTF9.itjdZFF_ja3TyT7Ar7118yvKhaSKHKq0ZRCDxOepi5U"
    //         }
    //     })
    //         .then(response => {
    //             setCardsRequest(response.data)
    //         })
    //         .catch(error => console.log(error))
    // }, []) 
    // console.log(cardsRequest)


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






    
    // const dispatch = useDispatch()

    // const { current, login } = authActions

    // console.log(user)





    // useEffect(() => {

    //     const token = localStorage.getItem("token")

    //     // console.log(token)
    //     if (!user.loggedIn && !!token) {
    //         axios.get('/api/clients/current', {
    //             headers: {
    //                 Authorization: "Bearer " + token
    //             }
    //         })
    //             .then(response => {
    //                 dispatch(current(response.data))
    //                 dispatch(login(token))
    //             })
    //     }
    // }, [])

    // console.log(token)





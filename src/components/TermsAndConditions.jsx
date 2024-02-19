import React, {useState} from 'react'

function TermsAndConditions() {

    const [isChecked, setIsChecked] = useState(false)
    const [isNotChecked, setisNotChecked] = useState(false)


    function handleSubmit (e){
        e.preventDefault()

        if (!isChecked) {
            setisNotChecked(true);
        } else {
            setisNotChecked(false);
        }
    }


    function handleCheckboxChange() {
    setIsChecked(!isChecked)
    setisNotChecked(false)
    }



    return (
        <div className='flex justify-center px-4 pt-10'>
        <div className='p-6 border-2 border-gray-400 rounded-xl max-w-[700px]'>
            <h5 className='font-bold'>Terms and Conditions for Opening a Bank Account</h5>
            <h6>Welcome to MindHub Bank! Before you proceed to open an account with us, please take a moment to review the following terms and conditions:</h6>
            <ol>
                <li></li>
                <li></li>
            </ol>
            <ol className='list-decimal list-inside pl-4'>
                <li className='font-semibold'>Account Eligibility:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>You must be at least 18 years old.</li>
                        <li>You agree to provide accurate and up-to-date personal information.</li>
                    </ul>
                
                <li className='font-semibold'>Identification and Verification:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>A valid government-issued photo ID is required.</li>
                        <li>Additional documents may be requested for identity verification.</li>
                    </ul>
                
                <li className='font-semibold'>Account Usage:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>Your account is for personal use only.</li>
                        <li>You agree not to engage in illegal or fraudulent activities.</li>
                    </ul>
                
                <li className='font-semibold'>Fees and Charges:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>Review our fee schedule for details on account-related charges.</li>
                        <li>We reserve the right to update fees with prior notice.</li>
                    </ul>
                
                <li className='font-semibold'>Online Banking:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>Access to online banking services is provided.</li>
                        <li>Safeguard your login credentials and report any unauthorized access.</li>
                    </ul>
                
                <li className='font-semibold'>Account Closure:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>Either party may close the account with reasonable notice.</li>
                        <li>Closing fees may apply; refer to our fee schedul e.</li>
                    </ul >
                
                <li className='font-semibold'>Privacy and Security:</li>
                    <ul className='list-disc list-inside pl-4'>
                        <li>Your information is protected under our privacy policy.</li>
                        <li>Report any security concerns or unauthorized transactions immediately.</li>
                    </ul >
                
            </ol>
            <p className='pt-4'>By proceeding with the account opening process, you acknowledge and agree to these terms and conditions. MindHub Bank reserves the right to amend these terms 
                with prior notice. If you have any questions, please contact our customer service. Thank you for choosing MindHub Bank!</p>
            <form action="" className='flex flex-col gap-2 justify-center items-center pt-4' onSubmit={handleSubmit}>
                <div className='flex gap-4 items-center pb-3 relative'>
                    <input type="checkbox" name="termsAndConditions" id="termsAndConditions" onChange={handleCheckboxChange}/>
                    <label htmlFor="termsAndConditions" className='font-semibold italic flex gap-2 items-center justify-center'>I accept the terms and conditions.</label>
                    {isNotChecked && (<p className='text-red-600 font-bold text-xs absolute top-5 pl-7'>You must accept terms and conditions.</p>)}
                </div>
                <input type="submit" value="Request" className='bg-red-600 rounded-xl py-2 px-1 hover:bg-red-700 w-[280px] text-center font-bold text-white'/>
            </form>
        </div>
    </div>
    )
}

export default TermsAndConditions
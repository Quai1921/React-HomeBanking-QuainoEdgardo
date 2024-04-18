import React from 'react'

function OptionAccounts({number}) {
    return (
            <option className="font-semibold italic" value={number}>{number}</option>
    )
}

export default OptionAccounts

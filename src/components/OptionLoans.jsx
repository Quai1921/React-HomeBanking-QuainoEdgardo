import React from 'react'

function OptionLoans({name}) {
    return (
                <option className="font-semibold italic" value={name}>{name}</option>
    )
}

export default OptionLoans

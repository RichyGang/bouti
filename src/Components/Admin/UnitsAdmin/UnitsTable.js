import React, {useRef} from "react";
import './index.css'
import {useDispatch} from "react-redux";
import {postUnitConversion} from "../../../Redux/reducers/units";
import useFormatTextNumber from "../../../hooks/useFormatTextNumber";

const UnitsTable = (props) => {

    const TableBodyUnit = ({unit}) => {

        const [ref] = useFormatTextNumber()

        const [newUnitConversion, setNewUnitConversion] = React.useState({coefficient: "", symbol: ""})
        const symbolRef = useRef(null)
        const dispatch = useDispatch()

        React.useEffect(()=>{
            symbolRef.current && symbolRef.current.focus()
        }, [symbolRef])

        const handleChange = (event) => {
            const {name, value} = event.target
            setNewUnitConversion({
                ...newUnitConversion,
                [name]: value
            })
        }

        function handleAddUnitConversion() {
            if (unit.id !== props.unit.id) {
                props.setUnit(unit)
            } else if (props.unit && newUnitConversion.coefficient && newUnitConversion.symbol) {
                newUnitConversion.coefficient = parseFloat(newUnitConversion.coefficient.replace(/,/, '.'))
                dispatch(postUnitConversion({unitConversion: newUnitConversion, unit: unit}))
            }
        }

        return (
            <tbody className="unit-table">
                <tr>
                    <td rowSpan="2">{unit.name}</td>
                    <td>symbole</td>
                    {unit.unitConversions.map((unitConversion)=> {
                            const index = unitConversion.symbol.indexOf("^")
                            return index >= 0 ?
                                (<td key={`symbol-${unitConversion.id}`}>
                                    <var>{unitConversion.symbol.slice(0, index)}
                                        <sup>{unitConversion.symbol.slice(index+1)}</sup>
                                    </var>
                                </td>)
                                :
                                (<td key={`symbol-${unitConversion.id}`}>{unitConversion.symbol}</td>)
                        }
                    )}
                    {unit.id === props.unit.id &&
                    <td>
                        <input
                            id="symbol"
                            name="symbol"
                            ref={symbolRef}
                            type="text"
                            value={newUnitConversion.symbol}
                            placeholder="symbole"
                            onChange={handleChange}
                        />
                    </td>}
                </tr>
                <tr>
                    <td>coefficient</td>
                    {unit.unitConversions.map((unitConversion)=><td key={`coefficient-${unitConversion.id}`}>{unitConversion.coefficient}</td>)}
                    {unit.id === props.unit.id &&
                    <td>
                        <input
                            id="coefficient"
                            name="coefficient"
                            type="text"
                            ref={ref}
                            value={newUnitConversion.coefficient}
                            placeholder="coefficient"
                            onChange={handleChange}
                        />
                    </td>}
                    <td className="button-add" rowSpan="2"><button onClick={handleAddUnitConversion}>+</button></td>
                </tr>
            </tbody>
        )
    }
    
    const UnitsTableElements = props.units.map((unit)=>
            <table key={unit.id}>
                <TableBodyUnit unit={unit}/>
            </table>
        )

    return (
        <>
            <h4>Tableau des unités</h4>
            <div className="units-table">
                {UnitsTableElements}
            </div>
        </>
    )
}

export default UnitsTable
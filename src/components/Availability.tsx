import { useState, type FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export interface AvailabilityFormData{
    checkIn: Date | null;
    checkOut: Date | null;
    adults: number;
    children: number;
}

export interface AvailabilityProps{
    onCheck?: (data: AvailabilityFormData) => Promise<string | Record<string, unknown>> 
}

const AvailabilityForm: FC<AvailabilityProps> = ({onCheck}) => {
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckout] = useState<Date | null>(null);
    const [adults, setAdults] = useState<number> (2);
    const [children, setChildren] = useState<number>(0);
    const [loading, setLoading] = useState<boolean> (false);
    const [message, setMessage] = useState<string | null> (null);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const payload: AvailabilityFormData = {checkIn, checkOut, adults, children};

        if(!checkIn || !checkOut) {setMessage("Seleziona entrambe le date!"); return;}
        if(checkOut < checkIn) {setMessage("La data di Checkout non può essere inferiore a quella di CheckIn"); return;}
        setLoading(true);
        try{
            if(onCheck) {
                const response = await onCheck(payload)
                setMessage(JSON.stringify(response))
            } else {
                setTimeout(()=> setMessage("Simulazione della risposta"), 500);
            }
        } 
        catch{
            setMessage("Errore durante la verifica");
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <div className="availability-wrapper">
            <form onSubmit={handleSubmit} className="availability-form">
                <div className="field">
                    <label>Check-In</label>
                    <DatePicker 
                        onChange={(date) => setCheckIn(date)}
                        selected={checkIn}
                        startDate={checkIn}
                        endDate={checkOut}
                        selectsStart
                        placeholderText="Seleziona la data del CheckIn"
                    />
                </div>
                <div className="field">
                    <label>Check-Out</label>
                    <DatePicker 
                        onChange={(date) => setCheckout(date)}
                        selected={checkOut}
                        startDate={checkIn}
                        endDate={checkOut}
                        selectsEnd
                        placeholderText="Seleziona la data del CheckOut"
                    />
                </div>
                <div className="field">
                    <label>Adulti</label>
                    <input 
                        type="number"
                        min="0"
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                    />
                </div>
                <div className="field">
                    <label>Bambini</label>
                    <input 
                        type="number"
                        min="0"
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                    />
                </div>
                <button type="submit" disabled={loading} className="submit-btn">
                    { loading ? 'Verifico ..' : 'Controllo Disponibilità'}
                </button>

                {message}

            </form>
        </div>
    )
 }



export default AvailabilityForm;
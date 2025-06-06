"use client"

export default function Modal({ title, desc, buttons }) {
    const buttonElements = buttons.map((btn, i) => <button key={i} className="btn w-full" onClick={btn.click}>{btn.text}</button>)

    return <div className="fixed modal inset-0 flex items-center justify-center">
        <div className="modal-bg p-6 rounded-xl shadow-xl w-96 text-center">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="mb-6">{desc}</p>
            
            <div className="flex gap-1">
                {buttonElements}
            </div>
        </div>
    </div>
}
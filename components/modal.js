"use client"

export default function Modal({ title, desc, buttons, children, setState }) {
    const buttonElements = buttons?.map((btn, i) => <button key={i} className="btn w-full" onClick={btn.click}>{btn.text}</button>)

    return <div className="fixed modal inset-0 flex items-center justify-center">
        <div className="modal-bg p-6 rounded-xl shadow-xl min-w-96 text-center gap-3 flex flex-col">
            <div className="flex">
                {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
                {   
                    close && 
                    <img className="ml-auto mb-4 hover:cursor-pointer icon" src="/assets/MdiClose.svg" width="24" alt="Close" onClick={() => setState(false)}/>
                }
            </div>
            {desc && <p className="mb-6">{desc}</p>}
            
            {children}

            <div className="flex gap-1">
                {buttonElements}
            </div>
        </div>
    </div>
}
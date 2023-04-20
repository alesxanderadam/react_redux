import React from 'react'
import './loader.css'
type Props = {}

export const Loader = (props: Props) => {
    return (
        <div>
            <div className='overlay'></div>
            <div className='absolute w-1/4 top-50 p-3 text-center left-50 bg-white border border-gray-400'>
                <div className='lds-roller'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div>Loading</div>
            </div>
        </div>
    )
}
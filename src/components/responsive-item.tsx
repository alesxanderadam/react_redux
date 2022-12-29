import { type } from '@testing-library/user-event/dist/type'
import React, { useState, useEffect } from 'react'

type Props = {
    // component: JSX.Element //<div><div/>
    component: React.FC //<Home /> <HomeMobile />
    componentMobile: React.FC //<Home /> <HomeMobile />
}

type Screen = {
    width: number,
    height: number,
}
const ResponsiveItem = (props: Props) => {
    const [screen, setScreen] = useState<Screen>({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const setScreenWindow = (): void => {
        setScreen({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
    useEffect(() => {
        window.onload = setScreenWindow;

        return () => {
            window.removeEventListener('load', setScreenWindow)
        }
    }, [])
    let Component: React.FC = props.component
    if (props.componentMobile && screen.width < 768) {
        Component = props.component;
    }
    return (
        <div><Component /></div>
    )
}

export default ResponsiveItem;
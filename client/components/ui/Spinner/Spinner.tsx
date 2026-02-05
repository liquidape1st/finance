import { forwardRef } from 'react'
import classNames from 'classnames'
import { Loader2 } from 'lucide-react'
import { CommonProps } from '@/types'
import type { ElementType } from 'react'

export interface SpinnerProps extends CommonProps {
    color?: string
    enableTheme?: boolean
    indicator?: ElementType
    isSpining?: boolean
    size?: string | number
}

const Spinner = forwardRef((props: SpinnerProps, ref) => {
    const {
        className,
        color,
        enableTheme = true,
        indicator: Component = Loader2,
        isSpining = true,
        size = 20,
        style,
        ...rest
    } = props

    const spinnerColor = color || (enableTheme && 'text-indigo-600')

    const spinnerStyle = {
        height: size,
        width: size,
        ...style,
    }

    const spinnerClass = classNames(
        isSpining && 'animate-spin',
        spinnerColor,
        className
    )

    return (
        <Component
            ref={ref}
            style={spinnerStyle}
            className={spinnerClass}
            {...rest}
        />
    )
})

Spinner.displayName = 'Spinner'

export default Spinner
import { Tooltip as ChkTooltip, PlacementWithLogical } from '@chakra-ui/react'

export const Tooltip = ({
  label,
  children,
  placement = 'bottom-end',
  isDisabled = false,
}: AppTooltipProps) => {
  return (
    <ChkTooltip
      hasArrow
      placement={placement}
      isDisabled={isDisabled}
      padding={2}
      label={label}
      openDelay={500}
      aria-label={label}
    >
      {children}
    </ChkTooltip>
  )
}

type AppTooltipProps = {
  label: string
  children: React.ReactNode
  placement?: PlacementWithLogical
  isDisabled?: boolean
}

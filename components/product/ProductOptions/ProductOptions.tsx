import { memo, useEffect, useState } from 'react'
import { Swatch } from '@components/product'
import type { ProductOption } from '@commerce/types/product'
import { SelectedOptions } from '../helpers'
import { useSlideContext } from '../context'

interface ProductOptionsProps {
  options: ProductOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  selectedOptions,
  setSelectedOptions
}) => {
  const { slider, moveToSlide } = useSlideContext()
  
  // If color is an option, move the slide image to match the first color choice
  useEffect(() => {
    if(options && slider) options.map(opt => {
      opt.values.map((v, i: number) => {
        if (opt.displayName.toLocaleLowerCase() === 'color' && i === 0) {
          moveToSlide(i, v.label)
        }
      })
    })
  }, [options, moveToSlide, slider])

  if (slider) {
    return (
      <div>
        {options.map(opt => (
          <div className="pb-4" key={opt.displayName}>
            <h2 className="uppercase font-medium text-sm tracking-wide">
              {opt.displayName}
            </h2>
            <div className="flex flex-row py-4">
              {opt.values.map((v, i: number) => {
                const active = selectedOptions[opt.displayName.toLowerCase()]
                return (
                  <Swatch
                    key={`${opt.id}-${i}`}
                    active={v.label.toLowerCase() === active}
                    variant={opt.displayName}
                    color={v.hexColors ? v.hexColors[0] : ''}
                    label={v.label}
                    onClick={() => {
                      setSelectedOptions(selectedOptions => {
                        return {
                          ...selectedOptions,
                          [opt.displayName.toLowerCase()]: v.label.toLowerCase()
                        }
                      })

                      // // if new color is clicked => invoke changeSlideImage
                      if (opt.displayName.toLowerCase() === 'color') {
                        moveToSlide(i, v.label)
                      }
                    }}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    return <div></div>
  }
}

export default memo(ProductOptions)

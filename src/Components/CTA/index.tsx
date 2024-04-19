import classNames from "classnames";
import { FC } from "react";

import Button from "Components/Button";
import { H2, Paragraph } from "Components/Typography";

import { ICTAProps } from "./types";

const CTA: FC<ICTAProps> = ({
  Icon,
  ButtonIcon,
  iconClassName,
  title,
  subtitle,
  buttonText,
  onClick
}) => {
  return (
    <div className='yl-flex yl-items-center yl-justify-center'>
      <div className='yl-flex yl-flex-col yl-items-center yl-text-center'>
        <div className='yl-flex yl-flex-col yl-items-center yl-justify-center yl-gap-4'>
          <div className='yl-flex yl-flex-col yl-gap-2'>
            {Icon && (
              <Icon
                className={classNames(
                  "yl-mx-auto yl-w-14 yl-text-primary md:yl-w-28",
                  iconClassName
                )}
              />
            )}

            <H2 className='yl-text-primary-text-color'>{title}</H2>
            <Paragraph
              margin='none'
              className='yl-mx-auto yl-max-w-md yl-text-primary-text-color yl-text-center'
            >
              {subtitle}
            </Paragraph>
          </div>

          {buttonText && onClick && (
            <Button onClick={onClick}>
              <span className='yl-flex yl-items-center yl-gap-2'>
                {ButtonIcon && (
                  <ButtonIcon className='yl-w-4' aria-hidden='true' />
                )}
                {buttonText}
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

CTA.defaultProps = {
  iconClassName: "",
  Icon: undefined,
  ButtonIcon: undefined,
  title: "",
  subtitle: "",
  buttonText: "",
  onClick: () => null
};

export default CTA;

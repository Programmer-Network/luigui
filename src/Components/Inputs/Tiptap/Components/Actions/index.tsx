import classNames from "classnames";
import { FC } from "react";

import Icon from "Components/Icon";

import { ITiptapActions, TiptapActionsEnum } from "../../types";

const TiptapActions: FC<{
  isEditorEmpty: boolean;
  actions: ITiptapActions;
}> = ({ isEditorEmpty, actions }) => {
  const { isConfirming, buttons, onAction } = actions;

  return (
    <div className='yl-flex justify-end yl-relative -yl-right-2'>
      <div className='yl-rounded-md yl-border-2 yl-border-primary-text-color/40 yl-bg-primary-background-color yl-p-1'>
        <div className='yl-flex yl-items-center yl-gap-1 yl-px-1'>
          {buttons.includes(TiptapActionsEnum.CONFIRM) && (
            <Icon
              onClick={
                !isEditorEmpty
                  ? () => onAction(TiptapActionsEnum.CONFIRM)
                  : () => null
              }
              iconName={!isConfirming ? "IconCheck" : "IconSpinner"}
              className={classNames(
                "yl-w-8 yl-cursor-pointer yl-fill-primary",
                {
                  "yl-text-primary-text-color/60": isEditorEmpty,
                  "yl-text-primary": !isEditorEmpty
                }
              )}
            />
          )}
          {buttons.includes(TiptapActionsEnum.CANCEL) && (
            <Icon
              onClick={() => onAction(TiptapActionsEnum.CANCEL)}
              iconName='IconCloseCircle'
              className='yl-w-8 yl-cursor-pointer yl-text-primary-text-color/60 hover:yl-text-primary-text-color'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TiptapActions;

import {
  CSSProperties,
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  MouseEvent,
} from "react";

import clsx from "clsx";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./Modal.module.scss";
import { useScrollBlock } from "../../hooks/useScrollBlock";

export interface IModalProps {
  open: boolean;
  maxWidth?: number;
  bodyPadding?: CSSProperties["padding"];
  onCancel: () => void;
  classes?: {
    content: string;
  };
}

const Modal: FC<PropsWithChildren<IModalProps>> = ({
  onCancel,
  children,
  open,
  maxWidth,
  classes,
}) => {
  const nodeRef = useRef(null);
  const [blockScroll, allowScroll] = useScrollBlock();

  const closeModal = () => {
    allowScroll();
    onCancel();
  };

  const closeOnOutsideClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      closeModal();
    },
    [closeModal],
  );

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? onCancel() : null;
    if (open) {
      document.body.addEventListener("keydown", closeOnEscapeKey);
    }
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (open) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [open]);

  return (
    <CSSTransition
      in={open}
      timeout={200}
      classNames="modal"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ModalPortal>
        <div className={styles.overlay} onClick={(e) => e.stopPropagation()}>
          <div className={styles.outside} onClick={closeOnOutsideClick} />
          <div
            className={clsx(styles.content, classes?.content)}
            style={{ maxWidth }}
            ref={nodeRef}
          >
            <button onClick={closeModal} className={styles.closeBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                  fill="#93929A"
                />
              </svg>
            </button>
            <div>{children}</div>
          </div>
        </div>
      </ModalPortal>
    </CSSTransition>
  );
};

export default memo(Modal);

const ModalPortal: FC<PropsWithChildren> = ({ children }) => {
  const container = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(children, container);
};

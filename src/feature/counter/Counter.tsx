/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';

import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';
import { useAppDispatch, useAppSelector } from 'hook/hookRedux';

export function Counter(): JSX.Element {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={(): { payload: undefined; type: string } =>
            dispatch(decrement())
          }
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={(): { payload: undefined; type: string } =>
            dispatch(increment())
          }
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e): void => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={(): { payload: number; type: string } =>
            dispatch(incrementByAmount(incrementValue))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={(): void => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}

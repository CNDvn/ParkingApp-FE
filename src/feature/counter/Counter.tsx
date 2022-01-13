import React, { useState } from 'react';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  selectStatus,
} from './counterSlice';
import styles from './Counter.module.css';
import { useAppDispatch, useAppSelector } from 'hook/hookRedux';
import { useLoadingToast } from 'hook/useLoading';
import { StatusRequest } from 'constants/statusRequest';

export function Counter(): JSX.Element {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;
  const statusRequest = useAppSelector(selectStatus);
  console.log(statusRequest);
  const { showToast } = useLoadingToast({
    loading: statusRequest === StatusRequest.PENDING ? true : false,
    loadingMessage: 'Loading request',
    successMessage: 'Loading success',
    errorMessage: 'Loading failed',
    status: statusRequest,
    path: '/login',
  });
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
          onClick={(): void => {
            dispatch(incrementByAmount(incrementValue));
          }}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={(): void => {
            showToast();
            dispatch(incrementAsync(incrementValue));
          }}
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

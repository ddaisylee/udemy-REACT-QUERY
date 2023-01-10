import { filter } from '@chakra-ui/system';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useQuery } from 'react-query';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { filterByTreatment } from '../utils';

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [filter, setFilter] = useState('all');
  const selectFunction = useCallback(
    (unfilterdStaff) => filterByTreatment(unfilterdStaff, filter),
    [filter],
  );
  const fallback = [];
  const { data: staff = fallback } = useQuery(queryKeys.staff, getStaff, {
    select: filter !== 'all' ? selectFunction : undefined,
  });

  return { staff, filter, setFilter };
}

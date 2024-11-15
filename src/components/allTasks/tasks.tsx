import { useState } from 'react'
import { useGetPaginatedTasksQuery } from '../../lib/api/todo'
import Card from '../card/card'
import CustomButton from '../common/button/customButton'
import { GeneralContentLoader } from '../common/loader/loader'

const AllTask = () => {
  const [limit] = useState(5)
  const [skip, setSKip] = useState(5)
  const [select] = useState<string>('title,reactions,userId')
  const { data, isFetching, isError } = useGetPaginatedTasksQuery({
    limit,
    skip,
    select,
  })

  if (isFetching) {
    return <GeneralContentLoader />
  }

  if (isError) {
    return <div>Error occurered</div>
  }

  function paginate() {
    const newSkip = skip + 5
    setSKip(newSkip)
  }

  return (
    <div className='m-5'>
      <div>
        <p>
          Total posts <span> {data?.total} </span>{' '}
        </p>
      </div>
      <Card posts={data?.posts || []} />
      <CustomButton
        htmlType='button'
        type='primary'
        className='mt-5 h-[50px]'
        onClick={paginate}
      >
        Load more
      </CustomButton>
    </div>
  )
}

export default AllTask

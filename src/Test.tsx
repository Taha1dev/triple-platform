export default function Test() {
  return <h1 className='text-8xl font-extrabold'>Welcome User Hello</h1>
}
// <div className='flex flex-col items-center justify-center h-[100px] p-4'>
//   <form
//     onSubmit={handleSubmit(onSubmit)}
//     className='space-y-4 flex flex-col'
//   >
//     {/* Country Select */}
//     <div className='w-full md:flex-1'>
//       <label className='block text-sm font-medium mb-2'>Country</label>
//       <Controller
//         name='country'
//         control={control}
//         defaultValue=''
//         render={({ field }) => (
//           <Select
//             onValueChange={value => {
//               field.onChange(value)
//               handleCountryChange(value)
//             }}
//             value={field.value}
//           >
//             <SelectTrigger className='w-full'>
//               <SelectValue placeholder='Select a Country' />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Countries</SelectLabel>
//                 {data.map((item: CountryData) => (
//                   <SelectItem key={item.country} value={item.country}>
//                     {item.country}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         )}
//       />
//     </div>

//     {/* City Select */}
//     <div className='w-full md:flex-1'>
//       <label className='block text-sm font-medium mb-2'>City</label>
//       <Controller
//         name='cities'
//         control={control}
//         defaultValue={[]}
//         render={() => (
//           <MultipleSelect
//             options={localCities} // Pass the array of strings
//           />
//         )}
//       />
//     </div>

//     {/* Submit Button */}
//     <button
//       type='submit'
//       className='mt-6 md:mt-0 w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
//     >
//       Submit
//     </button>
//   </form>
// </div>

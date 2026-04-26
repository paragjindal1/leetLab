import React from 'react'
import {useForm} from "react-hook-form";
import {X ,Plus, BookOpen, Code, Sparkles} from "lucide-react";
const CreatePlaylistModal = ({isOpen , onClose , onSubmit}) => {
    const {register , handleSubmit , formState:{errors} , reset} = useForm();

    const handleFormSubmit = async (data)=>{
        await onSubmit(data);
        reset()
        onClose()
    }

    if(!isOpen) return null;

  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
 <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg transform transition-all duration-300">
   
   {/* Header */}
   <div className="flex justify-between items-center p-6 border-b border-slate-200">
     <div className="flex items-center gap-3">
       <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
         <BookOpen className="w-6 h-6 text-white" />
       </div>
       <div>
         <h3 className="text-2xl font-bold text-slate-800">Create New Playlist</h3>
         <p className="text-slate-600 text-sm">Organize your coding challenges</p>
       </div>
     </div>
     <button 
       onClick={onClose} 
       className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200 text-slate-400 hover:text-slate-600"
     >
       <X className="w-5 h-5" />
     </button>
   </div>

   {/* Form Content */}
   <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
     
     {/* Playlist Name */}
     <div className="space-y-2">
       <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider">
         <Code className="w-4 h-4 text-blue-600" />
         Playlist Name
       </label>
       <div className="relative">
         <input
           type="text"
           className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 hover:border-slate-400"
           placeholder="Dynamic Programming Mastery"
           {...register('name', { required: 'Playlist name is required' })}
         />
       </div>
       {errors.name && (
         <div className="flex items-center gap-1 text-red-600 text-sm">
           <div className="w-1 h-1 bg-red-500 rounded-full"></div>
           {errors.name.message}
         </div>
       )}
     </div>

     {/* Description */}
     <div className="space-y-2">
       <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider">
         <Sparkles className="w-4 h-4 text-purple-600" />
         Description
         <span className="text-slate-500 text-xs normal-case">(Optional)</span>
       </label>
       <textarea
         className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-slate-400 bg-slate-50 resize-none h-24"
         placeholder="A curated collection of dynamic programming problems to master algorithmic thinking..."
         {...register('description')}
       />
       <div className="flex justify-between items-center">
         <div className="text-slate-500 text-xs">
           Help others understand what this playlist is about
         </div>
       </div>
     </div>

     {/* Action Buttons */}
     <div className="flex gap-3 pt-4">
       <button 
         type="button" 
         onClick={onClose}
         className="flex-1 px-6 py-3 text-slate-600 bg-white border border-slate-300 rounded-xl font-medium hover:bg-slate-50 transition-all duration-150"
       >
         Cancel
       </button>
       <button 
         type="submit"
         className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
       >
         <Plus className="w-4 h-4" />
         Create Playlist
       </button>
     </div>
   </form>
 </div>
</div>
  )
}

export default CreatePlaylistModal

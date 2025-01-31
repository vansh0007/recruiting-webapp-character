import React, {useState} from 'react'
import  './Role.module.css'
import { CLASS_LIST } from '../../consts'

const Role = ({characters, onUpdate}) => {
    const [selectedRole, setSelectedRole] = useState(null)

    const handleRoleClick = (role) => {
        setSelectedRole(selectedRole === role ? null : role);
    }


    const meetsRequirements = (className) => {
        const requirements = CLASS_LIST[className];
        return Object.entries(requirements).every(
            ([attr, value]) => characters.attributes[attr] >= value
        );
    };

    return (
        <div className="roleContaine">
            <div className="roleList">
                {
                    Object.keys(CLASS_LIST).map((role)=>{
                        const isEligible = meetsRequirements(role)
                        return (
                            <div key={role} className="roleItems">
                                <h3 
                                    style = {{color: isEligible ? "green" : "grey"}}
                                    onClick={()=>handleRoleClick(role)}
                                >
                                    {role}
                                </h3>
                                {
                                    selectedRole === role && (
                                        <div 
                                            style={{color: isEligible ? "green" : "grey"}}
                                        >
                                           {Object.entries(CLASS_LIST[role]).map(([attr, value]) => (
                                             <div key={attr}>
                                            <span>
                                            {attr}: {value.toString()}
                                            </span>
                                        </div>
                                        ))}
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Role
export default function TabButton({isSelected, children, ...props}) {
    return ( 
        <li> 
            <button className={isSelected ? "active" : undefined} {...props} >{children}</button> 
        </li> 
    );
}
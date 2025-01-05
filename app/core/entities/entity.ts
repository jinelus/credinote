import { UniqueEntityId } from "./unique-entity-id"


export abstract class Entity<Props> {
    private _id: UniqueEntityId
    public props: Props

    constructor(props: Props, id?: string) {
        this._id = new UniqueEntityId(id)
        this.props = props
    }

    get id() {
        return this._id
    }

    public equals(entity: Entity<Props>) {
        if(this === entity){
          return true
        }
    
        if(this._id === entity._id){
          return true
        }
    
        return false
    }
}